class VVComponent {
    #list = [];
    constructor() { }
    init() {
        return new Promise((resolve, reject) => {
            this.#list.forEach(async item => {
                await this.#importScript(item)
            });
            resolve();
        });
    }
    #importScript(path) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = path;
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Error loading script: ${path}`));
            document.head.appendChild(script);
        });
    }
};

export default VVComponent;