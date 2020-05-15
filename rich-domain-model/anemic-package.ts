// #1 Avoid Anemic - Prevent your clients from creating your objects in an inconsistent state.
import {ExternalPackageSystem} from "./external-package-service";

class AnemicPackage {
    // @validator
    type!: string

    // @validator
    variant!: string

    // @validator
    size!: string
}

// #2 Push your behaviour and domain rules from domain services to your domain model.
class AnemicPackageService {

    #external: ExternalPackageSystem

    constructor(external: ExternalPackageSystem) {
        this.#external = external
    }

    start(pkg: AnemicPackage) {
        // construct package
        // validate
        this.#external.prepareOrder()
        this.#external.executeOrder()
        // persist to db
        // send events to bus
    }
}


