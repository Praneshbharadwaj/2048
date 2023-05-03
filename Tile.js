export default class Tile{
    #tileElement
    #x;
    #y;
    #value

    constructor(TileContainer, value = Math.random()> .5 ? 2 : 4){
        this.#tileElement = document.createElement("div")
        this.#tileElement.classList.add("tile");
        TileContainer.append(this.#tileElement)
        this.value = value

    }


    get value(){
        return this.#value
    }



    set value (v){
        this.#value = v;
        this.#tileElement.textContent = this.#value
        const power = Math.log2(v)
        const backgroundlightness = 100 - power * 9;
        this.#tileElement.style.setProperty("--background-lightness",`${backgroundlightness}%` )
        this.#tileElement.style.setProperty("--text-lightness",`${backgroundlightness<=50 ? 90 : 10}%` )


    }

    set x(value)
    {
        this.#x = value;
        this.#tileElement.style.setProperty("--x",value)
    }

    set y(value)
    {   
        this.#y = value;
        this.#tileElement.style.setProperty("--y",value)
    }
    remove()
    {
        this.#tileElement.remove()
    }
    

    waitForTransition(animation = false){
        return new Promise(resolve=>{
            this.#tileElement.addEventListener(animation? "animationend":"transitionend",resolve,{once:true})
        })
    }


}
 