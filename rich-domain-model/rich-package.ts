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

// DomainEvent
class EventBus {
    emit(event: string, context: any) {
        console.log(`Event:`, event, context, context.toString())
    }
}

// Aggregate
export class RichPackage {

    #id!: Guid
    #type!: Type
    #variant!: Variant
    #size!: Size
    #status!: Status

    #service: ExternalPackageSystem
    #events: EventBus

    private constructor(
        service: ExternalPackageSystem = new ExternalPackageSystem(),
        events: EventBus = new EventBus()
    ) {
        this.#service = service
        this.#events = events
    }

    static register(type: Type,
                    size: Size,
                    variant: Variant) {
        const pkg = new RichPackage()
        // compose new object
        pkg.#type = type
        pkg.#size = size
        pkg.#variant = variant
        pkg.#status = new Status('before-submit')

        // validate

        // check funds

        // execute
        pkg.#service.prepareOrder()
        pkg.#service.executeOrder()
        pkg.#status = new Status('submitted')
        // persist
        pkg.#id = new Guid('aaaa-bbbb')
        pkg.#events.emit(`Package created`, pkg)
        return pkg
    }

    static load(
        guuid: Guid
    ): RichPackage {
        const pkg = new RichPackage()
        // from factory  repository - using guuid
        pkg.#id = guuid
        pkg.#type = new Type('some-type')
        pkg.#size = new Size('small')
        pkg.#variant = new Variant('box')
        pkg.#status = new Status('in-progress')
        return pkg
    }

    status(): Status {
        if (this.#status.isFinished()) {
            return this.#status
        }
        this.#status = new Status(this.#service.status())
        if (this.#status.isFinished()) {
           this.#events.emit('package delivery closed', this)
        }
        return this.#status
    }

    toString() {
        return `Package(${this.#id.value}) [${this.#status}]`
    }
}

