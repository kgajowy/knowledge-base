* Entities
    - Domain objects that we care to uniquely identify.
    - Examples:
        - Wallet (Mobility RichPackage)
        - Reservation
        - ActiveTickets
    
* Value Objects
    - `Value objects` have no identity. They are attributes of Entities
    -  its immutable custom types that are distinguishable only by the state of its properties
    - Examples:
        - `Name`
        - `JobStatus`
        - `ReservationId`
        
* Aggregates
    - These are a collection of entities are that bound together by an aggregate root. 
    - The aggregate root is the thing that we refer to for lookups. 
    - No members from within the aggregate boundary can be referred to directly from anything external to the aggregate. This is how the aggregate maintains consistency.
    - Examples:
        - `User`
        - `RichPackage`
        - `Rental`
        
* Repository 
    - resolve domain objects from persistence
    - `Factory` to map
    
* DomainService
    - no relation to repositories
    - rely on `Aggregates`
    - contains logic that do not belong to any one Object
    
* Application Service
    - fetch entities, pass to `DomainServices` to interact

* DomainEvents 
    - CQRS <3
