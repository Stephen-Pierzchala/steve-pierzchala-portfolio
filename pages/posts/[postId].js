import { useRouter } from "next/router";
const fs = require("fs");
const path = require("path");

const Post = ({ postData }) => {
	const router = useRouter();
	const { postId } = router.query;

	return (
		<>
			<h1 className="text-red-500">Test</h1>
			<p>Post: {postId}</p>
			<p>{postData.md}</p>
			<p>{postData.metadata.title}</p>
			<p>{postData.metadata.subtitle}</p>
			<p>{postData.metadata.tags}</p>
			<p>{postData.metadata.date}</p>
			<p>{postData.metadata.isNew}</p>
		</>
	);
};

export async function getStaticPaths() {
	const outputPaths = [];

	const targetFolder = "./data/posts";
	const folderNames = fs.readdirSync(targetFolder);

	let paths = folderNames.map((name) => {
		return { params: { postId: name } };
	});

	return { paths, fallback: false };
}

export async function getStaticProps(context) {
	const postData = {};
	const targetFolder = `./data/posts/${context.params.postId}`;

	//read metaData
	postData.metadata = JSON.parse(
		fs.readFileSync(path.resolve(`${targetFolder}/metadata.json`), "utf8")
	);
	postData.postId = `${postData.metadata.postId}`;

	//read the markdown
	postData.md = `${fs.readFileSync(
		path.resolve(`${targetFolder}/post.md`),
		"utf-8"
	)}`;

	return { props: { postData } };
}

export default Post;
