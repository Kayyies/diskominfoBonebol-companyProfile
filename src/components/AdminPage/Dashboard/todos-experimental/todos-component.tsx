import { PrismaClient } from "@prisma/client";
import Button from "./button";

export default async function TodosPage() {
  const prisma = new PrismaClient();
  const todos = await prisma.latihan.findMany();

  const addTodo = async (formData: FormData) => {
    "use server";

    const content = formData.get("content");
    await prisma.latihan.create({
      data: {
        content: content as string,
      },
    });
  };

  return (
    <>
      <div className="mx-auto flex flex-col items-center">
        <h1 className="mb-3 text-center text-xl font-bold">Todos App</h1>
        <form action={addTodo} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Write your activity here"
            className="w-80 rounded-md border-2 border-solid bg-white px-3 py-3 text-black"
            required
          />
          <button className="rounded-md bg-blue-800 px-3 py-3 text-white">
            Tambahkan Data
          </button>
        </form>
        <div className="item-center flex flex-col">
          <h1 className="mt-10 text-center text-xl font-bold">Kegiatanq</h1>
          <ul className="list-disc">
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
