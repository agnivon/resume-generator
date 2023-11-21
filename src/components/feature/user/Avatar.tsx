import Image from "next/image";

type AvatarProps = {
  name: string | undefined | null;
  imageUrl?: string | null;
};

export default function Avatar(props: AvatarProps) {
  let { name = "User", imageUrl } = props;
  name = name || "User";
  const [firstName, lastName] = name.split(" ");
  return (
    <div className="flex gap-4 items-center">
      {imageUrl ? (
        <Image
          height={35}
          width={35}
          className="rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={imageUrl}
          alt="Rounded avatar"
        />
      ) : (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {firstName[0]}
            {lastName[0]}
          </span>
        </div>
      )}
      <div className="font-medium dark:text-white">
        <div>{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          User
        </div>
      </div>
    </div>
  );
}
