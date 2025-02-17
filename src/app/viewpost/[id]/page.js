import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import bodystyles from "../../body.module.css";
export default async function ViewPostPage({ params }) {
  const { id } = params;

  const singlepost = await db.query(`SELECT * from socialposts WHERE id=$1`, [
    id,
  ]);
  if (singlepost.rows.length === 0) {
    return <h1>post not found</h1>;
  }
  const wrangledpost = singlepost.rows[0];
  console.log(wrangledpost);

  const username = await db.query(
    `SELECT username from userprofile where id= $1`,
    [wrangledpost.userid]
  );

  if (username.rows.length === 0) {
    console.log("Username not found");
    return;
  }

  const user = username.rows[0].username;
  console.log(user);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className={`${bodystyles.h1} text-black`}> {wrangledpost.title}</h1>

        <h2 className={`${bodystyles.h2} text-black`}>
          By :
          <Link
            href={`/user/${user}`}
            className="text-blue-500 hover:text-green-500"
          >
            {user}
          </Link>
        </h2>
        <Image
          src={wrangledpost.src}
          alt={wrangledpost.title}
          width={500}
          height={500}
          style={{ objectFit: "cover" }}
        />

        <p>{wrangledpost.content}</p>
      </div>
    </>
  );
}
