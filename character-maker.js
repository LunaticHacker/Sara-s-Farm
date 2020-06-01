var randomCharacter = function () {
  let rdata = {};
  rdata.sex = random(characterData.sex);
  rdata.skin = random(characterData.skin);
  rdata.eye = random(characterData.eye);
  rdata.hair = random(characterData.hair);
  rdata.haircolor = random(characterData.haircolor);
  rdata.shirt = random(characterData.shirt);
  rdata.pants = random(characterData.pants);
  rdata.shoes = random(characterData.shoes);
  rdata.nose = random(characterData.nose);
  rdata.facial = random(characterData.facial);

  var shirt_type = "sleeveless";
  //console.log(data)

  if (rdata.sex === "male") shirt_type = "longsleeve";

  var image_array = [
    {
      src: `images/ULPC/body/${rdata.sex}/${rdata.skin}.png`,
    },
    {
      src: `images/ULPC/body/${rdata.sex}/eyes/${rdata.eye}.png`,
      x: 0,
      y: 0,
    },
    {
      src: `images/ULPC/hair/${rdata.sex}/${rdata.hair}/${rdata.haircolor}.png`,
      x: 0,
      y: 0,
    },
    {
      src: `images/ULPC/torso/shirts/${shirt_type}/${rdata.sex}/${rdata.shirt}_${shirt_type}.png`,
      x: 0,
      y: 0,
    },
    {
      src: `images/ULPC/legs/pants/${rdata.sex}/${rdata.pants}_pants_${rdata.sex}.png`,
      x: 0,
      y: 0,
    },
    {
      src: `images/ULPC/feet/shoes/${rdata.sex}/${rdata.shoes}_${rdata.sex}.png`,
      x: 0,
      y: 0,
    },
  ];
  if (rdata.skin !== "red_orc" && rdata.skin !== "orc") {
    image_array.push({
      src: `/images/ULPC/body/${rdata.sex}/nose/${rdata.nose}_${rdata.skin}.png`,
      x: 0,
      y: 0,
    });
  }
  if (rdata.facial !== "none") {
    image_array.push({
      src: `images/ULPC/facial/${rdata.sex}/${rdata.facial}.png`,
      x: 0,
      y: 0,
    });
  }
  return image_array;
};
