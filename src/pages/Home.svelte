<script>
  import MirrorList from "../components/MirrorList.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  //import Router from "svelte-spa-router";

  import '../app.css'

  export let postsNames, postsUrls;
</script>

<div class="basis-full lg:basis-2/3">
  <MirrorList />
</div>
<div class="basis-full lg:basis-1/3">
  <Sidebar postsNames = {postsNames} postsUrls = {postsUrls}/>
</div>
