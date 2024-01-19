<script>
  import { ArrowPath, Icon } from "svelte-hero-icons";
  import "../styles/status.css";

  const mirrorStatus = (async () => {
    const response = await fetch(
      "https://mirrors.seu.edu.cn/-/api/tunasync.json"
    );
    let status = await response.json();
    status.sort(function (a, b) {
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
    <table class="mt-3 table-auto text-left border-collapse">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr class="row bg-gray-200 text-stone-800">
          <th class="p-2">Name</th>
          <th class="p-2">Next Schedule</th>
          <th class="p-2">Upstream</th>
          <th class="p-2">Size</th>
          <th class="p-2">Status</th>
        </tr>
      </thead>

      <tbody>
        {#each data as mirror}
          <tr
            class={(() => {
              let cls = ["hover:bg-[#f4f6f7] border-t-2"];
              if (mirror.status == "syncing") {
                cls.push("bg-amber-100	");
              } else if (mirror.status == "failed") {
                cls.push("bg-red-100");
              }
              return cls.join(" ");
            })()}>
            <td class="lg:px-2 lg:py-3" data-label="Name">{mirror.name}</td>
            <td class="tabular-nums lg:px-2 lg:py-3" data-label="Next Schedule"
              >{mirror.next_schedule == "0001-01-01 00:00:00 +0000"
                ? mirror.last_started
                : mirror.next_schedule}</td>
            <td class="lg:px-2 lg:py-3" data-label="Upstream">{mirror.upstream}</td>
            <td class="lg:px-2 lg:py-3" data-label="Size">{mirror.size}</td>
            <td class="lg:px-2 lg:py-3" data-label="Status">{mirror.status}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:catch error}
    <p>An error occurred! {error}</p>
  {/await}
</div>
