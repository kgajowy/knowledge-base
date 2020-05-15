// DomainEvent
import {DomainId, Guid, RichPackage, Size, Type, Variant} from "./rich-package";

export class EventBus {
    emit(event: string, context: any) {
        console.log(`(application-layer -> event):`, event, context.toString())
    }
}

// Repository
export class Repository<T extends DomainId> {
    #store: { [index in string]: T } = {}

    persist(domainObject: T) {
        console.log(`(application-layer -> repository) persisting: `, domainObject.toString())
        this.#store[domainObject.getId().value] = domainObject // convert to DB representation
    }

    load(guid: Guid) {
        console.log(`(repository) loading: `, guid)
        return this.#store[guid.value] // convert to DomainObject
    }
}

// Q: isn't it getting bigger and bigger?
export class ApplicationLayer {

    constructor(
        private readonly events: EventBus = new EventBus(),
        private readonly repository: Repository<RichPackage> = new Repository<RichPackage>()
    ) {
    }

    newOrder(type: Type,
             size: Size,
             variant: Variant): RichPackage {
        const internalId = new Guid('aadsacxz' + Math.random())

        // TODO: validate pkg
        const pkg = RichPackage.register(internalId, type, size, variant)

        this.repository.persist(pkg)
        this.events.emit(`Package created`, pkg)
        return pkg
    }

    getStatus(id: Guid) {
        const pkg = this.repository.load(id)
        return pkg.status
    }
}
