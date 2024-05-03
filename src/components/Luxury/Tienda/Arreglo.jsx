import React from 'react'

function Arreglo({arreglo, checklistArreglos, setChecklistArreglos}) {
  const handleClick = () => {
    if (checklistArreglos.includes(arreglo._id)) {
      // Si el arreglo ya está en el checklist, lo eliminamos
      setChecklistArreglos(checklistArreglos.filter(item => item !== arreglo._id));
    } else {
      // Si el arreglo no está en el checklist, lo agregamos
      setChecklistArreglos(checklistArreglos.concat(arreglo._id));
    }
  };

  return (
    <div
      key={arreglo.id}
      className="w-[190px] h-[27px] flex flex-row  items-center px-[5px] cursor-pointer gap-[9px]"
    >
      <div
        id={arreglo.id}
        className={`w-[21px] h-[21px]  rounded-[6px] border-[1px] border-[#E39C9D] ${checklistArreglos.includes(arreglo._id) ? "bg-[#E39C9D]" : "bg-transparent"}`}
        onClick={handleClick}
      />
      <label htmlFor={arreglo._id}>{arreglo.nombre}</label>
    </div>
  )
}

export default Arreglo