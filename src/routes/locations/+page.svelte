<script lang="ts">
  let { data } = $props();
  let { locations } = data;
</script>

<div class="container m-5">
  {#each locations as location}
    <div>
      <h1 class="text-2xl font-bold">{location.name}</h1>
      <p>
        <span class="font-semibold">Type:</span>
        {location.type}
      </p>
      <p>
        <span class="font-semibold">Description:</span>
        {location.description}
      </p>
      <p>
        <span class="font-semibold">Coordinates:</span>
        {location.latitude}, {location.longitude}
      </p>
      <div>
        <h2 class="font-semibold">Media:</h2>
        {#each location.expand.media as media}
          <div class="outline-1 w-fit rounded-md my-2">
            <h3 class="font-medium">{media.title}</h3>
            {#if media.type === "image"}
              <img src={media.file} alt={media.description} />
            {/if}
            <p>
              Description: <span class="font-light">{media.description}</span>
            </p>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
