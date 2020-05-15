import {ApplicationLayer, Repository} from "./rich-package.application";
import {RichPackage, Size, Type, Variant} from "./rich-package";
import {RichPackageDomainlayer} from "./rich-package.domainlayer";

const repo = new Repository<RichPackage>()

const applicationLayer = new ApplicationLayer( undefined, repo)
const someLayer = new RichPackageDomainlayer(undefined, repo)

const pkg = applicationLayer.newOrder(new Type('box'), new Size('small'), new Variant('packed-as-present'))
console.log(`Got newly created package`, pkg.toString())
console.log(`--- wait a bit for delivery... ---`)
someLayer.listenFor(pkg.getId())
setTimeout(() => {
    console.log(`Is it there now?`)
    console.log(applicationLayer.getStatus(pkg.getId()))
}, 9000)

