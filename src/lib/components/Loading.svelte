<div class="grid h-screen place-items-center">
	<img class="logo-loading mx-auto h-auto text-primary" src="/img/loading.svg" alt="Loading..." />
</div>

<style>
	.logo-loading {
		animation: jump 1s infinite;
	}

	.logo-loading::after {
		content: '';
		display: block;
		width: 50px;
		height: 5px;
		position: absolute;
		top: 130px;
		animation: shadow 1s infinite;
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
	}

	@keyframes shadow {
		0% {
			transform: scale(0.6);
			animation-timing-function: ease-in;
		}
		40% {
			transform: scale(1);
			animation-timing-function: ease-out;
		}
		55% {
			transform: scale(1.4);
			animation-timing-function: ease-in;
		}
		60% {
			transform: scale(1);
			animation-timing-function: ease-out;
		}
		100% {
			transform: scale(0.6);
			animation-timing-function: ease-in;
		}
	}

	@keyframes jump {
		0% {
			transform: scale(1) translateY(0);
			animation-timing-function: ease-in;
		}
		40% {
			transform: scaleY(1.05) translateY(60px);
			animation-timing-function: ease-out;
		}
		55% {
			transform: scale(1.2, 0.8) translateY(110px);
			animation-timing-function: ease-in;
		}
		60% {
			transform: scaleY(1.1) translateY(60px);
			animation-timing-function: ease-out;
		}
		95% {
			transform: scaleY(1.05) translateY(0);
			animation-timing-function: ease-in;
		}
		100% {
			transform: scale(1) translateY(0);
			animation-timing-function: ease-in;
		}
	}
</style>
