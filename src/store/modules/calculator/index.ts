import { StoreOptions } from "vuex";
import { Calculator } from "@/helpers/calculations";

const calculatorStore = {
    namespaced: true,
    state: () => ({
        calculator: null
    }),
    mutations: {

    }
}

export default calculatorStore;