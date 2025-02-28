import React from 'react'
import { useProfessionalStore } from '../store/useProfessionalStore'


function ProfessionalHome() {
  const {authProfessional,professionalLogout}=useProfessionalStore();
  return (
    <div>
      <h1>
        {console.log("helloo",authProfessional)}
      sheeerrrrr:{authProfessional?.professional?.name||"default"}
      </h1>
      <button onClick={professionalLogout}>
        logout
      </button>
    </div>
  )
}

export default ProfessionalHome
