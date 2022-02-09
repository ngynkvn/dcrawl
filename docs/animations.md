# Adding new Animation frames

Our texture atlas pairs along with a json file that describes 
how to create the sprites from the image. These are found in the "frames" key 
in the json as an object with `frame name` keys and
information of where sprites are located within the image as the value. 

For sprites with multiple frames for playing animations, must 
be formatted in the following way: `[Name]_[State]_anim[Frame #]`, due to 
the strong typing imposed in `src/types.ts`.