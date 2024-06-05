import ERC721_ITEMS_ABI_JSON from "./ERC721Items.json";
import ERC721_ITEMS_FACTORY_ABI_JSON from "./ERC721ItemsFactory.json";
import ERC721_SALE_ABI_JSON from "./ERC721Sale.json";
import ERC721_SALE_FACTORY_ABI_JSON from "./ERC721SaleFactory.json";

// Viem requires "output" on ABI functions even when empty
const normaliseABI = (abi: any) => {
  return abi.map((item: any) => {
    if (item.type === "function" && !item.outputs) {
      item.outputs = [];
    }
    return item;
  });
};

const ERC721_ITEMS_ABI = normaliseABI(ERC721_ITEMS_ABI_JSON);
const ERC721_ITEMS_FACTORY_ABI = normaliseABI(ERC721_ITEMS_FACTORY_ABI_JSON);
const ERC721_SALE_ABI = normaliseABI(ERC721_SALE_ABI_JSON);
const ERC721_SALE_FACTORY_ABI = normaliseABI(ERC721_SALE_FACTORY_ABI_JSON);

export {
  ERC721_ITEMS_ABI,
  ERC721_ITEMS_FACTORY_ABI,
  ERC721_SALE_ABI,
  ERC721_SALE_FACTORY_ABI,
};
