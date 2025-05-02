<script lang="ts">
	const images = [
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/3b28gn24927335m/hmppx10_uldw441ljg.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/2se9c0mlm902ux4/hmppx8_62veax7qwo.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/x1512u6560k7v47/hmppx7_olqyepds5v.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/gqv8lg5g1ogfy8h/paper_camera2012_11_26_14_20_07_8ix97tppif.jpg",
		"hhttp://127.0.0.1:8090/api/files/ia77ailu3ghoodv/4zvm3182526f3b5/hmppx1_x0nw8brh94.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/mbm1oj1h3jono80/hmppx2_pnesgl6ep4.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/sbndhhc591p7jef/hopu_manu_16_nov_2012_097_czzje6x5yl.JPG",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/v5hauz3m03026iz/hopu_manu_16_nov_2012_069_byfjpqkko4.JPG"

	];
</script>

<div class="overflow-hidden w-full">
	<div class="marquee flex w-max animate-marquee gap-8">
		{#each [...images, ...images] as src, i}
			<img
				src={src}
				alt={`image ${i}`}
				class="h-32 w-48 rounded-md object-cover shadow"
			/>
		{/each}
	</div>
</div>
