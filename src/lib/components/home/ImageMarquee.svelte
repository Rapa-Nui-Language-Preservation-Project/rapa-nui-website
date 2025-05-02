<script lang="ts">
	const images = [
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/0de8x34jot74fcr/screenshot_2025_04_14_at_8_04_d5u5yvtdpc.27PM.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/s718fkw89hh68y9/paper_camera2012_11_26_14_17_43_af9n9sbkio.jpg",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/hv0b009265nrg85/hmppx5_13yd9imgw5.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/x1512u6560k7v47/hmppx7_olqyepds5v.png",
		"http://127.0.0.1:8090/api/files/ia77ailu3ghoodv/y88l4s22smoh581/paper_camera2012_11_26_14_19_27_t1lgf7337l.jpg"
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
