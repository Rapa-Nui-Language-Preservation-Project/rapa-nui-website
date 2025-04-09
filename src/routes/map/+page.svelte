<script>
  import maplibregl from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  $effect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://demotiles.maplibre.org/style.json",
      center: [-109.35, -27.15],
      //   center: [0, 0],
      zoom: 11,
    });
  });

  let map_hidden = $state(false);
</script>

<div id="map" class="h-screen absolute" hidden={map_hidden}></div>
<main class="flex justify-center w-screen h-screen bg-[#625661]">
  <button
    onclick={() => (map_hidden = !map_hidden)}
    class="absolute right-0 top-0 bg-neutral-400 hover:bg-neutral-600 text-white p-2 m-4 rounded-lg cursor-pointer"
  >
    {map_hidden ? "Show Map" : "Hide Map"}</button
  >
  <div class="h-screen absolute">
    <img
      src="http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/6jjx168s5ezt2m8/map_k7mm569qll.png"
      class="h-screen"
      alt="Map of Easter Island"
    />
  </div>
</main>
