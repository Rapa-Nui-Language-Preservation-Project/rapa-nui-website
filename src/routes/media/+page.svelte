<script lang="ts">
  let { data } = $props();
  let { media } = data;
  media.forEach(
    (item: any) => (item.src = `http://0.0.0.0:8000/media/${item.source}`)
  );
</script>

{#each media as item}
  <div style="display: flex; flex-direction: row; gap: 10px">
    <img src={item.src} width="500px" alt="" />
    <div>
      <p style="font-weight: bold;">title: {item.title}</p>
      <p>id: {item.id}</p>
      <p>type: {item.type}</p>
      <p>source: {item.source}</p>
      <p>license: {item.license}</p>
      <p>locations:</p>
      <div
        style="display: flex; flex-direction: row; gap: 5px; outline: solid 1px black; padding: 5px"
      >
        {#each item.locations as location}
          <div>
            <p>id: {location.id}</p>
            <p>name: {location.name}</p>
            <p>type: {location.type}</p>
            <p>description: {location.description}</p>
            <p>language: {location.language}</p>
            <p>latitude: {location.latitude}</p>
            <p>longitude: {location.longitude}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/each}
