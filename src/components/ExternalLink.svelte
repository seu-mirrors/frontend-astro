<script>
    import { ArrowUpRight, Icon } from "svelte-hero-icons"

    export let href = "";
</script>

<a href="{href}" target="_blank" class="inline-flex items-center">
    <slot></slot> <Icon src={ArrowUpRight} class="h-4 w-4 ml-0.5" mini/>
</a>