<script>
  import { Icon, ArchiveBox } from "svelte-hero-icons";

  const mirrorStatus = (async () => {
    const response = await fetch("https://mirrors.seu.edu.cn/-/api/tunasync.json");
    let status = await response.json();
    status.sort(function(a, b){
        return a.name.localeCompare(b.name);
    });
    return status;
  })();
</script>

<div class="px-4 py-3 flex flex-col">
  <p class="font-medium text-xl flex items-center">
    <Icon class="w-6 h-6 mr-2" src={ArchiveBox} solid />
    镜像列表
  </p>


  {#await mirrorStatus}
    <p>...waiting</p>
  {:then data}
    <table class="mt-3 table-fixed w-full text-left">
        <colgroup>
        <col class="w-1/2" />
        <col class="w-1/2" />
        </colgroup>

        <thead>
            <tr class="row">
                <th>Name</th>
                <th>Last Update</th>
            </tr>
        </thead>

        <tbody>
            {#each data as mirror}
                <tr class="hover:bg-[#f4f6f7]">
                    <td class="filename"><a href="/{mirror.name}">{mirror.name}</a></td>
                    <td class="filetime tabular-nums">{mirror.last_update}</td>
                </tr>
            {/each}
        </tbody>
    </table>
  {:catch error}
	<p>An error occurred! {error}</p>
  {/await}

</div>
