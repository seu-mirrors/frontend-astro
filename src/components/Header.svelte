<script>
  const location = window.location.pathname;
  const SEULogo = "/favicon.svg";
</script>

<header
  class="relative flex flex-wrap w-full items-center justify-between bg-white text-neutral-900 caddy-shadow px-caddy py-6 grow-0 shrink-0"
>
  <div class="caddy-wrapper">
    <div class="flex max-w-caddy flex-wrap items-center basis-full justify-between font-medium">
      <a class="flex items-center no-underline hover:no-underline" href="/">
        <img class="mr-2 h-10 w-10 opacity-95" src={SEULogo} alt="SEU Logo" />
        <span class="text-xl"
          >东南大学开源镜像站 <span class="text-neutral-400">/</span> SEU Mirrors<sup class="text-blue-600 ml-0.5">α</sup></span>
      </a>

      <div class="space-x-4 header-nav max-sm:mt-6 nav-links">
        <a class="rounded-2xl" href="/">首页</a>
        <a class="rounded-2xl" href="/status">同步状态</a>
        <a class="rounded-2xl" href="/news">新闻通知</a>
      </div>
    </div>

    <div class={(location === "/") ? "mt-8 mb-4 space-y-2 basis-full" : "hidden"}>
      <h1 class="font-medium text-black text-4xl">稳定、可靠的开源镜像服务</h1>
      <p class="text-xl">基于「快照」的原子化同步，无中间状态，始终完整。</p>
    </div>
  </div>
</header>

<style>
  /* 导航样式 */

  .nav-links {
    width: 100%;
    top: 5rem;
    left: 48px;
    background-color: #ff9776;
    display: none;
    margin: 0;
  }

  .nav-links a {
    display: block;
    text-align: center;
    padding: 10px 0;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .nav-links a:hover,
  .nav-links a:focus {
    background-color: #CDD4E0FF;
  }

  .expanded {
    display: unset;
  }

  @media screen and (min-width: 636px) {
    .nav-links {
      margin-left: 5em;
      display: block;
      position: static;
      width: auto;
      background: none;
    }

    .nav-links a {
      display: inline-block;
      padding: 15px 20px;
    }

  }
</style>