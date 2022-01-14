import { createStore } from "vuex";
import calculatorStore from "./modules/calculator";


export default createStore({
    modules: {
        calculator: calculatorStore
    }
})