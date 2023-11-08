<script>
  import MirrorList from "../components/MirrorList.svelte";
  import Sidebar from "../components/Sidebar.svelte";

  import '../app.css'

  export let postsNames, postsUrls, postsDates;
</script>

<div class="caddy-wrapper flex flex-wrap bg-white text-neutral-900 gap-0 lg:divide-x max-lg:divide-y caddy-main grow">
  <div class="basis-full lg:basis-2/3">
    <MirrorList />
  </div>
  <div class="basis-full lg:basis-1/3">
    <Sidebar postsNames={postsNames} postsUrls={postsUrls} postsDates={postsDates}/>
  </div>
</div>