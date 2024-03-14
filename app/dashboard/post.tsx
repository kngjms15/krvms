interface PostProps {
    id: string;
    title: string;
    content: string;
    authorName: string;
}

export default function Post({ id, title, content, authorName }: PostProps) {
    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h3 className="text-xl ">{authorName}</h3>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-gray-700 mt-2">{content}</p>
        </div>
    );
}
  