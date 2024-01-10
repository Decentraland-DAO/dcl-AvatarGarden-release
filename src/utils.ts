//Only library imports here
import { Entity, PBMaterial_PbrMaterial, Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";

/**
 * Returns the normaliced direction vector from point1 to point2
 * @param point1 - the first point position
 * @param point2 - the second point position
 * @returns normaliced direction vector
 */
export function directionVectorBetweenTwoPoints(point1: Vector3, point2: Vector3): Vector3 {
    return Vector3.normalize({x: point2.x - point1.x, y: point2.y - point1.y, z: point2.z - point1.z});
}


export function rotate(quaternion: Quaternion, angles: Vector3): Quaternion {
    return Quaternion.multiply(quaternion, Quaternion.fromEulerDegrees(angles.x, angles.y, angles.z));
}


/**
 * Returns the value in between the start and end values based on amt
 * @param start - start value
 * @param end - end value
 * @param amt - amount to lerp
 * @returns lerped value
 */
export function lerp(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end
}

/**
 * Returns the clampled value between min and max
 * @param num - original value
 * @param min - minimum possible value
 * @param max - maximum possible value
 * @returns clamped value
 */
export function clamp(num: number, min: number, max: number): number {
    return num <= min ? min : num >= max ? max : num;
}

/**
 * Returns a random integer between min and max (both included)
 * @param min - minimum possible value
 * @param max - maximum possible value
 * @returns random integer
 */
export function randomIntFromInterval(min: number, max: number): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFloatFromInterval(min: number, max: number): number { // min and max included
    return Math.random() * (max - min) + min;
}

/**
 * Returns the formatted time from milliseconds to `hh:mm:ss`
 * @param millis - milliseconds
 * @returns formatted time string
 */
export function millisToMinutesAndSecondsAndHours(millis: number): string {
    const hours = Math.floor(millis / 3600000)
    const minutes = Math.floor((millis % 3600000) / 60000)
    const seconds = ((millis % 60000) / 1000)
    const secondsString = Math.floor(seconds)
    return (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + secondsString;
}

/**
 * Returns the formatted time from milliseconds to `hh:mm`
 * @param millis - milliseconds
 * @returns formatted time string
 */
export function millisToMinutesAndHours(millis: number): string {
    const hours = Math.floor(millis / 3600000)
    const minutes = Math.floor((millis % 3600000) / 60000)
    return (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes
}

/**
 * Returns the formatted time from milliseconds to `mm:ss`
 * @param millis - milliseconds
 * @returns formatted time string
 */
export function millisToMinutesAndSeconds(millis: number): string {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000)
    const secondsString = Math.floor(seconds)+""
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + secondsString;
}

/**
 * Returns the formatted time from milliseconds to `mm:ss:ms`
 * @param millis - milliseconds
 * @returns formatted time string
 */
export function millisToMinutesAndSecondsAndMilis(millis: number) {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000)
    const secondsString = seconds.toFixed(0)
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + secondsString + ":" + (millis % 1000);
}

/**
 * Returns the formatted time from milliseconds to `ss:ms`
 * @param millis - milliseconds
 * @returns formatted time string
 */
export function millisToMillisAndSeconds(millis: number) {
    const seconds = Math.floor(millis / 1000)
    const secondsString = seconds.toFixed(0)
    return (seconds < 10 ? '0' : '') + secondsString + ":" + (millis % 1000);
}
/**
 * Returns the formatted time from milliseconds to `ss`
 * @param millis - milliseconds
 * @returns formatted time string
 */
export function millisToSeconds(millis: number) {
    const seconds = Math.floor(millis / 1000)
    const secondsString = seconds.toFixed(0)
    return (seconds < 10 ? '0' : '') + secondsString;
}

/**
 * Returns the array with its elements randomly shuffled
 * @param array - array to shuffle
 * @returns shuffled array
 */
export function shuffle<T>(array: Array<T>): T[] {
    let currentIndex = array.length, randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}


/**
 * Gets the world position of an entity
 * @param entity
 * @returns a vector3 world position
 */
export function getWorldPositionByPolygonal(entity: Entity, position = Vector3.Zero()) {

    const transform = Transform.get(entity)
    //No transform
    if (!transform) return Vector3.Zero()
  
    let scaledPosition = {...transform.position}
    //Scale relative position by parent scale
    if (transform.parent) {
        const parentTransform = Transform.get(transform.parent)
        if(parentTransform) {
            scaledPosition.x = scaledPosition.x * parentTransform.scale.x
            scaledPosition.y = scaledPosition.y * parentTransform.scale.y
            scaledPosition.z = scaledPosition.z * parentTransform.scale.z
        }
    }
    //Update position
    position.x = position.x + scaledPosition.x
    position.y = position.y + scaledPosition.y
    position.z = position.z + scaledPosition.z

    //No more parents
    if (!transform.parent) return position;

    //Get world position of the parent
    return getWorldPositionByPolygonal(transform.parent, position)
}

export function randomColor4(bRandomAlpha: boolean = false) {
    return Color4.create(Math.random(), Math.random(), Math.random(), bRandomAlpha ? Math.random() : 1)
}

export function distanceToPlayer(entity: Entity) {
    return Vector3.distance(Transform.get(engine.PlayerEntity).position, Transform.get(entity).position)
}

export type PBMaterialPbr = {
    $case: "pbr";
    pbr: PBMaterial_PbrMaterial;
}