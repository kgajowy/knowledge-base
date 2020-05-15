import {ExternalPackageSystem} from "./external-package-service";
import {Guid, RichPackage, Status} from "./rich-package";
import {EventBus, Repository} from "./rich-package.application";

export class RichPackageDomainlayer {
    constructor(
        private readonly events: EventBus = new EventBus(),
        private readonly repository: Repository<RichPackage> = new Repository<RichPackage>()
    ) {
    }

    listenFor(id: Guid) {
        setTimeout(() => {
            console.log(`domain layer, is it?`, `--- delivery is there ! --- `)
            const delivered = this.repository.load(id)
            delivered.status = new Status(`delivered`)
            this.repository.persist(delivered)
            this.events.emit(`(event) delivered`, delivered)
        }, 4000)
    }
}
