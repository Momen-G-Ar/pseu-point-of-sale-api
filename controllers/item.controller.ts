import mongoose from "mongoose";
import express from 'express';
import { Item } from "../models";
import { ItemNS } from "../types";


const addItem = async (item: ItemNS.Item) => {
    const newItem = new Item({
        name: item.name,
        price: item.price,
        barcode: item.barcode,
        image: item.image,
        priceHistory: item.priceHistory,
        addedBy: item.addedBy,
        description: item.description
    });

    return newItem
        .save()
        .then(() => {
            return true;
        })
        .catch((error: mongoose.Error) => {
            console.error("the error is : " + error.message);
            return false;
        });
};

const getItems = async (query: ItemNS.IItemQuery) => {

    const filter: mongoose.FilterQuery<ItemNS.Item> = {};
    const searchTerms = query.searchTerms || '';
    if (query.category) {
        //We have to bring items from collections table (categories)
    }
    const regex = new RegExp(searchTerms, 'i');
    filter.name = regex;
    return await Item.find(filter);
};

const getItem = async (id: string) => {
    let response = await Item.findById(id, (err: any, docs: any) => {
        if (err) {
            response = null;
        } else {
            response = docs;
        }
    });
    return response;
};

const deleteItem = async (id: string) => {
    let response = await Item.findByIdAndDelete(id, (err: any, docs: any) => {
        if (err) {
            response = null;
        } else {
            response = docs;
        }
    });
    return response;
};



export default {
    addItem,
    getItems,
    getItem,
    deleteItem
};
