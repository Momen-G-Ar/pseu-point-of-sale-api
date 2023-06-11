namespace ItemNS {
    export interface Item {
        name: string,
        price: number,
        image: string,
        barcode: string,
        description: string,
        addedBy: string,
        priceHistory: [{ date: Date, price: Number; }],
    };

    export interface IItemQuery {
        searchTerms: string
    }
}

export default ItemNS;