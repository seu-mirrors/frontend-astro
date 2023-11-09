<script>
  import { ArrowPath, Icon } from "svelte-hero-icons";

  const mirrorStatus = (async () => {
    const response = await fetch("https://mirrors.seu.edu.cn/-/api/tunasync.json");
    let status = await response.json();
    status.sort(function(a, b){
        return a.name.localeCompare(b.name);
    });
    return status;
  })();
</script>
<div class="px-4 py-3 flex flex-col w-full">
  <p class="font-medium text-xl flex items-center">
    <Icon class="w-6 h-6 mr-2" src={ArrowPath} solid />
    同步状态
  </p>

  {#await mirrorStatus}
    <p>...waiting</p>
  {:then data}
    <table class="mt-3 table-fixed text-left">
        <colgroup>
        <col class="w-1/6" />
        <col class="w-1/4" />
        <col class="w-5/12" />
        <col class="w-1/12" />
        <col class="w-1/12" />
        </colgroup>

        <thead>
            <tr class="row">
                <th>Name</th>
                <th>Next Schedule</th>
                <th>Upstream</th>
                <th>Size</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
            {#each data as mirror}
                <tr class={
                    (() => {
                        let cls = ["hover:bg-[#f4f6f7]"]
                        if (mirror.status == "syncing") {
                            cls.push("bg-amber-100	")
                        } else if (mirror.status == "failed") {
                            cls.push("bg-red-100")
                        }
                        return cls.join(" ")
                    })()
                }>
                    <td>{mirror.name}</td>
                    <td class="tabular-nums">{mirror.next_schedule == "0001-01-01 00:00:00 +0000" ? mirror.last_started : mirror.next_schedule}</td>
                    <td>{mirror.upstream}</td>
                    <td>{mirror.size}</td>
                    <td>{mirror.status}</td>
                </tr>
            {/each}
        </tbody>
    </table>
  {:catch error}
	<p>An error occurred! {error}</p>
  {/await}
</div>