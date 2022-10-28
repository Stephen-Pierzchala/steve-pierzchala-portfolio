import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<p>testing automatic deployment</p>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
