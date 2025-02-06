<script>
	import { PDFDocument } from 'pdf-lib';

	let files = []; // Array to store the uploaded PDF files

	
	// Handle file input from dragdrop
	function handleFileInput(event) {
		const selectedFiles = Array.from(event.target.files);
		addFiles(selectedFiles);
   }

    // Handle file input change
	function addFiles(selectedFiles) {
		if (selectedFiles.every(file => file.type === 'application/pdf')) {
		files = [...files, ...selectedFiles];
		} else {
		alert('Please upload valid PDF files.');
		}
	}

	// Merge PDFs
	async function mergePDFs() {
		if (files.length < 2) {
			alert('Please upload at least two PDF files to merge.');
			return;
		}

		try {
			// Create a new PDF document
			const mergedPdf = await PDFDocument.create();

			// Loop through each file and add its pages to the merged PDF
			for (const file of files) {
				const fileArrayBuffer = await file.arrayBuffer();
				const pdfDocument = await PDFDocument.load(fileArrayBuffer);

				// Copy pages from the current PDF to the merged PDF
				const pages = await mergedPdf.copyPages(pdfDocument, pdfDocument.getPageIndices());
				for (const page of pages) {
					mergedPdf.addPage(page);
				}
			}

			// Save the merged PDF
			const mergedPdfBytes = await mergedPdf.save();
			const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);

			// Trigger download
			const a = document.createElement('a');
			a.href = url;
			a.download = 'merged.pdf';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			alert('PDFs merged successfully!');
		} catch (error) {
			console.error('Error merging PDFs:', error);
			alert('An error occurred while merging the PDFs.');
		}
	}

		function triggerFileInput() {
		document.getElementById("fileInput").click();
	}

	function handleDragOver(event) {
		event.preventDefault(); // Prevents default behavior (opening the file in the browser)
	}

	function handleDrop(event) {
		event.preventDefault();
		const droppedFiles = Array.from(event.dataTransfer.files);
		addFiles(droppedFiles);
	}
</script>

<div class="z-20">
	<ul class="flex flex-col items-center mt-4 space-y-2">
		{#each files as file}
			<li class="text-center bg-gray-100 px-4 py-2 rounded-md w-3/4">{file.name}</li>
		{/each}
	</ul>
	<div class="flex flex-col gap-2 flex-1 items-center justify-center pb-10 md:pb-14">
		
			<input type="file" id="fileInput" accept="application/pdf" multiple on:change={handleFileInput} style="display: none;"/>
		 <!-- svelte-ignore a11y_no_static_element_interactions -->
		 <!-- svelte-ignore a11y_click_events_have_key_events -->
		 <div class="w-[500px] max-w-[4000px] h-[250px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center cursor-pointer mt-2 p-2"
		 on:click={triggerFileInput}
		 on:dragover={handleDragOver}
		 on:drop={handleDrop}

		 ><p>Drag & Drop PDF files here or click to upload</p></div>
	</div>

	<div class="flex flex-col gap-10 flex-1 items-center justify-center pb-10 md:pb-14">
		<button class="specialBtnDark" on:click={mergePDFs} >
			Merge PDFs
		</button>
	</div>
</div>
