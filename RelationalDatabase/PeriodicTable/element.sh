#! /bin/bash
PSQL="psql -x --username=freecodecamp --dbname=periodic_table --tuples-only -c"

if [ -z $1 ]; then
  echo "Please provide an element as an argument."
else
  if [[ $1 =~ ^[0-9]+$ ]]; then
    ELEMENT_DATA=$($PSQL "select elements.name, elements.symbol, elements.atomic_number, types.type, properties.atomic_mass, properties.melting_point_celsius, boiling_point_celsius from elements inner join properties on elements.atomic_number = properties.atomic_number inner join types on properties.type_id = types.type_id where elements.atomic_number = '$1'")
  else
    ELEMENT_DATA=$($PSQL "select elements.name, elements.symbol, elements.atomic_number, types.type, properties.atomic_mass, properties.melting_point_celsius, boiling_point_celsius from elements inner join properties on elements.atomic_number = properties.atomic_number inner join types on properties.type_id = types.type_id where elements.name = '$1' OR elements.symbol = '$1'")
  fi

  if [[ -z $ELEMENT_DATA ]]; then
    echo "I could not find that element in the database."
  else
    echo $ELEMENT_DATA | while read BAR1 BAR2 NAME BAR4 BAR5 SYMBOL BAR7 BAR8 ATOMICNUMBER BAR10 BAR11 TYPE BAR13 BAR14 ATOMICMASS BAR16 BAR17 MELTING BAR19 BAR20 BOILING BAR21
      do 
        echo "The element with atomic number $ATOMICNUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMICMASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
      done
  fi
fi
