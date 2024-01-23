import { Schemas, engine } from "@dcl/sdk/ecs";

export const TagComponent = engine.defineComponent(
	"tagComponent",
	{
		tag: Schemas.String,
	})