import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { Item } from "../types.ts";
let items: Item[] = [
  { id: "1", name: "milk", price: 23 },
  { id: "2", name: "coffee", price: 13 },
  { id: "3", name: "tea", price: 33 },
];

//get all items
// home/
const getItems = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: items,
  };
};

// get single item
// home/:id
const getItem = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const item: Item | undefined = items.find((el) => el.id === params.id);
  if (item) {
    response.status = 200;
    response.body = {
      success: true,
      data: item,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No item Found",
    };
  }
};

//adding new item
// POST request
// home/:id
const addItem = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data Sent",
    };
  } else {
    const item: Item = body.value;
    item.id = v4.generate();
    items.push(item);

    response.status = 201;
    response.body = {
      success: true,
      data: item,
    };
  }
};

//update item
// PUT request
// home/:id
const updateItem = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const item: Item | undefined = items.find((el) => el.id === params.id);
  if (item) {
    const body = await request.body();

    const updateItem: { name?: string; age?: number } = body.value;
    items = items.map((i) => i.id === params.id ? { ...i, ...updateItem } : i);

    response.status = 200;
    response.body = {
      success: true,
      data: items,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No item Found",
    };
  }
};

// delet item
// home/:id

const deleteItem = (
  { params, response }: { params: { id: string }; response: any },
) => {
  items = items.filter((it) => it.id !== params.id);
  response.body = {
    success: true,
    msg: "item removed",
  };
};

export { getItems, getItem, addItem, updateItem, deleteItem };
