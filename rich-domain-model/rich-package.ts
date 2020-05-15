import {TinyTypeOf} from 'tiny-types'
import {ExternalPackageSystem} from "./external-package-service";

// Value Objects
export class Type extends TinyTypeOf<string>() {
}

export class Variant extends TinyTypeOf<string>() {
}

export class Size extends TinyTypeOf<string>() {
}

export class Guid extends TinyTypeOf<string>() {
}

export class Status extends TinyTypeOf<string>() {
    isFinished() {
        return this.value === 'done'
    }
}

export class DomainId {
    readonly #id!: Guid

    constructor(id: Guid) {
        this.#id = id
    }

    getId(): Guid {
        return this.#id
    }
}


// Aggregate
export class RichPackage extends DomainId {
    #type!: Type
    #variant!: Variant
    #size!: Size
    status!: Status

    #service: ExternalPackageSystem

    private constructor(id: Guid,
                        private readonly service: ExternalPackageSystem = new ExternalPackageSystem()) {
        super(id)
        this.#service = service
    }

    static register(
        id: Guid,
        type: Type,
        size: Size,
        variant: Variant) {
        const pkg = new RichPackage(id)
        pkg.#type = type
        pkg.#size = size
        pkg.#variant = variant
        pkg.status = new Status('before-submit')

        // validate

        // check funds

        // submit
        pkg.#service.prepareOrder()
        pkg.#service.executeOrder()

        pkg.status = new Status('submitted')
        return pkg
    }

    toString() {
        return `Package(${this.getId().value}) [${this.status}]`
    }
}

