<script lang="ts">
    import { TestService } from "./services/test";
    import {onMount} from "svelte";

    let statusText: string = ""
    let status: number = 0;
    let message: string = "";

    const testService = new TestService();

    onMount(async () => {
        const response = await testService.getTest();
        status = response.status;
        message = response.data.message;
        statusText = response.statusText;
    });

</script>

<main class="bg-black w-full h-[100vh]">
    <div class="flex justify-center items-center h-full">
        <div class="text-white">
            <h1 class="text-4xl">Status: {status}</h1>
            <h2 class="text-2xl">Status Text: {statusText}</h2>
            <p class="text-lg">Message: {message}</p>
        </div>
    </div>
</main>