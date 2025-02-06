<script>
 function testBtn(){
    console.log("Test 1")
 }
</script>

<header class="flex flex-col relative z-20">
    <div class="max-w-[1400] mx-auto w-full flex items-center justify-between p-4 py-6">
        <a href="/">
        <h1 class="font-semibold">PDF <span class="text-indigo-400">Merge</span></h1>
    </a>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="md:hidden grid place-items-center" >
        <i class="fa-solid fa-bars"></i>
    </button>
    <nav class="hidden md:flex items-center gap-4 lg:gap-6">
        <a class="duration-200 hover:text-indigo-400 cursor-pointer" href="#product">Products</a>
        <a class="duration-200 hover:text-indigo-400 cursor-pointer" href="#reviews">Reviews</a>
        <a class="duration-200 hover:text-indigo-400 cursor-pointer" href="#faqs">FAQs</a>
        <button class="specialBtn" on:click={testBtn}>
            <p>Start free today</p>
        </button>
    </nav>
    </div>
    
</header>

