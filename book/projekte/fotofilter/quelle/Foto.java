public class Foto {

    /* Diese Datei ist erzeugt. Sie stammt aus
       tools/fotofilter/erzeuge_foto.py und wird nicht von Hand geaendert.

       Das Foto steckt in DATEN: eine Zeichenkette je Bildzeile, drei Zeichen
       je Bildpunkt - rot, gruen, blau. Jedes Zeichen steht fuer eine von 64
       Stufen; mal 4 ergibt daraus wieder ein Wert von 0 bis 255. */

    private static final String ZEICHEN =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-";

    private static final String[] DATEN = {
        "O8cP8fQ9hQ8kS8mU9oV8rW8uX8wZ7za7-a5-c5+lL+yl--z-yzzyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyzyyz+++l+vHzo6+l6-j6-h7+f8xd8ub8sZ7rZ8sZ4xk6z-a--n-+o-+j-+b-+W-yM-hArRBcPBZQCZPCYPCXOCWODWNDWNDVNDVNDUNDUMDTMDTMDTMDTMDTMDTMDTMESNERQDRaDRpETvDUvCVuBTrBPmCPeDPREPLFQLFQLGQLGQMGQMGQMGQMGR",
        "O8dQ8hQ8kR8lS8nU8pW8sX7wY6ya6+a4-Z3+kH+yk--z+yyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyxyyzzyyz-+zo+vGzo5-l7-j7-h7ze8wd8ua8sZ8rZ6xf3zyT+-k-+n-+j-+b-+V-+N-lBvTAeQBaQCZPCYPCXPCXODXODWNDVNDVNDUNDUMDTMDTMDTMDTMDTMDTMDTMESNESQDRZDRoETvDUvDVuBTrBQmCPeDPSEQLFPLFQLGQLGQMGQMGQMGRMGR",
        "P8eQ8hR8lT8nT8oV8sX7vY7xZ5+a4-Z2+fCzwg--+-yyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyxyyyyyxyyz+-++kztCzn6-l7-j7-g8ye8vc9ta8sa7wc2ytJz-g--k-+j-+b-+U--O-pCyWAiQCaQCaQCZPCYPCXPDXODWODVNDVNDVNEUNEUMEUMDTMDTNETNETMETMETNESQDRZDSnEUvDUvDUtCTrBQnBOfCPSEQLFQLGQMGQMGRMHRMHQMHRNHS",
        "Q8gR8iS8mT8oV8qW7uY7xZ6za5-Z2-c4zrU+-w-zzyyyyxyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyxxyyxyyyyyy+-+xZyr7zl6-k7-h8+f8xd9ub9ta8vb4zoCz-c--i-+i--c-+T+-N-tE+aBnRCaQCbQCaQDZQDYPDXODWODWODVODVNDVNEVNDUNDUNDTNETNETNETMETNETQERYESnETvDTuCUtBSrBQnBOfDPTEQLFQMGRMGRNHSNHSNHRNHRNHS",
        "Q8hS8jT8mU8qW8tX7vY6yZ6+a3-Y1+iF+yo-z+zyyxyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyxyxzzy+w+uKyo4-k6-j7-h8ye9vc9ta9ua6yj6z+V--f--h-+c-zS+-M+vF-eAsTCdRDbRDbRDaQDZQEYPEXOEXOEWOEWOEVOEVOEVNEVNEUNEUNETNETMETNETQESYESmETvDTuCUuBSrBQnBPgCPUEQMFQMGRMGSNHSNHSNHSNHSNIS",
        "R8iS8kU8oU8rW7uY7wZ7ya6+Z2-a4zpU--x-yzyyyyyyyxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyxyz-+xgyq7zm6-k7-i7+g8xd9uc9tb7xf3zxN+-d--f-+c-+R--L+yG-i9vUCfSEbSEbREbREaQEZQEYPFYPEXPFXPFWOEWOEWOEWOEVNEUNEUNEUNEUNETPESXESlETuCTuCUtBSrBQnBPhCQVFQMGQMGRNHSNHSNHSNITNITOIT",
        "S8jT8lU8oV8sX7vY7yZ6+a5-Z1+e9+vg--++yyyyyyxyxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxyyxyyyyxzzzzvztHxn4-l6-j7+h7xe8uc8tb8wd2zsEz-Z--d-+b-+R-+K+zG-m9xVChSEbSEcSEbREbREaRFaQFZQFYQFYPFXPFXPFXPFWOEWOFVOEVOEUNEUNEUPESXESkEUuCTuCUtBSrBQnBPhCPVFQNGRNHSNHSNHSNITOITNITNIT",
        "S8kT8mU8pW8sX7vZ7ya6+a5-a1ziG+yq-++zyyyyyyxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyy++zvVxq4+m5-l6+i7yf7wd8uc7vc3+m7z-U-+a--a-+S-+I++F-pAzYBkSEcTEcSEbSEbSEbRFaRFZRFZQFZQFZQFZQFYPFXPFWPFWPFVOFVOFUOFUQFTWETjEUtDTuCUtBSrBQnBPhCPVEQNGRNHSNHSNHSNHSNHSNHSNHS",
        "S8kT8nV8qW8tX7vZ6za6+a4-a1+kL+zv-zzzyyyyyyxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyxyz-zyjys7yo4-m5-j5+h6xe7ud7uc5zi3+zN--X--Z-+S-zH+zE-rA-bApTDdSEcSEbSEbREaREaRFaRFaQFZQFZQFZQFYQFXPFWPFWPFVPFVOFVOFVQFUWFTiEUtDUuCUtBSrBRnBPhCPWEQNFQMGRMGRMHRMHSMGRMGRMGR",
        "S7kT7oV8rW8uX7xY5+a5-a3-Z2+mR++x-zzzyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxyzyztzsFwp3-n4-l5+i6xg6ue6uc6xe1+vG--T--W-+S-yH+yD-tA-f9uTCeRDbRDbRDaREaREaRFaQFZQFZQFYQFYQFYQFXPFWPFVOFVOFVOEVOEVPFUVEThEUsDUtCTtBSrARnAOhBPXDQNFQMFQLFQLGRMGRLGRLGRLGR",
        "T7lU7oV7sW7uY7xZ5+a5-a3-Z3ymSy+y-zzzyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxyyyyyy+zzvNxq2+o4-m5+j6yg6vd6tc6wc1+p8+-P--U--S-xH+wB+uA-i8xVBgQCaQCZQDaRDaQEaQEZPEYPEYPEXPEXPEXPEWOEVOEVOEVOEUNEUOEUPETUETfDSsCUtCTtBSrARoAOiBPYDQOEPLEQLFQLFQLFQLFQLGRLGR",
        "T8lU8oV7sW7uX7xZ6+a5-a4-Z2zlQy+x-zzzyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyxyz-zwYxr3+p3-n5-k5yh6ve6tc6vc3yk3++K--Q--Q-yH+u9+t6-m7+XAkQCZQCZQCaQDaQDZPDYODXODXODWODXODXODVNDVNDUNDUNDUNDUNDUOETTDSeDSrCTtBTsBTrARoAOiBPZCQOEPLEPLFQLFQLFQLFQLGRLGR",
        "T9mV9pW9sW8uY7xZ6+a5-a4-a2+kNy+w-zzzyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyxyxxz-zxhxt5zq4-n5-k5zh6wf6td6uc5yf2+wE--N--O-zH-t8+r3+n5-ZAoQBZQBZQBZQCZPCYPCXOCXODXODXODWNDWNDVNDVNDUNDUNDUNCUMDUNDTRDRbDSpDUsCTsBTrARoAPjBPbCQOEQLEPLFQLFQLFQLFQLGRLGR",
        "VCoVBrWAtXAvY9xZ8+a6-a5-b4+iHyys+z+zyyyyyyyyyxyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyxyyxxz+zyqytAyq3-o5-k5zh6wf6uc6tb6wc2zq8--K--L-zI-s7+q2+n3-c9sRBaPBYQBZPBYPBYOCXOCXOCWODWODWNDWNDVNDUNDUNDUNDUNDUNDUNDTRDRaCRoCTsCTrBSqARoAPjBPbCQPEQKFPLFQLFQLFQLGRLGRLGR",
        "VEqWDsXCuXCwYCyZA+b9-b7-b6-gEzwm+++zyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyxyyxyyzyzxztGwr1-p4-l5zi6xg6ud6sc6uc3zl4+yG-zI-yG-s7-q1+n2-f8vTAePBYPBZPBYPBYOCXOCXOCWNCWODWNDVNCVNDUNDUNDUNDUNDUNDUNDTQDSYDRlDTsBTsBSrARo9PjAPbCQQEQLEPLFQLFQLFQMFRMFRMGR",
        "WGsXFtYEvYExZDzaC-bA-bA-b9-gD+ug++++yyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxyxyyyyxyz+ztOwr1+p4-m5+j6xh6ue6sc6tc5yh2+vB-yG-wF-r7-o0-n1-h8zVAiPBYPBYPBYPBYOCXOCXNCWNCWNCWNCVNCVNDUNDUNDUNDUNDUNDUNDTPDSXCSlCTrBTrBSqARn9PiAPbCQRDQLEQLFQLEQMFQMFQMFRMGR",
        "XGsXGuYFwYFxaEzaD-bC-cC-cB-gD+ta+-z+yzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyxyxyz-+uYwq2zq4-m5zk5xh6uf7sc7qc6ve1+p6+wD-vD-r6-m0-m0-k7-YBnQBZQBYPBZPBYOBXOCWNCWNCWNCWNDVNCUNDUNDUNDUNDUMDUNDTNDSODSWBSkBTqBSqBSpARn9Pi9ObBQQCQKEQLEQLERMFQMFQMFRMFR",
        "YGrYGtYFvZFxaEzaE-bD-cD-cC-gD+qV++x+z+zyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyxyxyz-zwjxp3yq4-n5zk6xh6uf7rc7qb6ud3zl2+t9-tB-q5-m0+l0-k4-cAtRAbPBYPBYPBYOBXOCWNCWNCWNCWNCVNCUNCUMDUMCUMCUMCUMCTMBTNBRU9RhARqBSqASpARn9Pi8Ob9OO9NH9NIBOJCPLEQMFRMFRMGR",
        "ZGrZGtZFvaFxbEycE+cD-cD-dD-gC-nP+zr-z+zyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxyxyz+zyrzp7xp4-m5zk5wh6uf7rc7qb7rb5xh0+q5-t9-q4-l0-k0-k3-eAxTBgQBaPBYPBXOBXOCWNCWNCWNCWNCVNCVNCUMCUMCUMCULBTLASJ8RK6PQ4Od7PoARpARo9Rl8Ph7Nb8OM4KC2ID4JE6LHAOLERMGSNGR",
        "aFraFtaFubFwcEydE+eD-eC-eC-gB-mJ+xj--++yzzyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxyyyyyzzyzoHvo4-m6zk6wh7tf7rc7oa7pa6ve1+m1-q3-p2-l0-j0-j2+g9zVAjSBdPBYOBXOCWOCWNCWNCVNCVNCVNCVNCVMCUMCULBTKASI7RF3NG1MM1Na5PmASn9Rm9Qj7Of6NY6NL3KB1IA1IA2IE6LLERNGSNHS",
        "aFqaFsaEubEvdExeDzfD-gC-fB-hB-lE+uY+-y-zzzzyzyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyxy+-+rRxn5+m9zk8wh8tf8rc8oa7oa7sc4zj0-o0-o0-l0-i0-i2-h7-W9lQBbPBZOBXOBWNCWNBWMCVNCVNCVNCVNCVMCUMCULBUI7SF1QE0OF0MI0MV3Oi8Rj9Qi8Pe6NX4MM2JE1IA1H90G91HD5KKDROHTNHT",
        "aFqaEraEtcEvdDxeDzgD-gC-gB-iB-kB+rN-+q-+++zyzyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyxxy+-ztcwm7znBzkAwhAtfArdApb9na9qb6xg0+m0-n0-l0-h0-h1-i6-Z9qOAZOBYOBYOBXOBWNBWNCVMCVNCVNCVMCVMCULBUK8TG2SF0RF0RE0PF0OM0NX4Pb5Qc5PV3MI0IB0H90H90H90G91HC5KKCQPHUOIV",
        "ZEpaErbEtcEvdDweDygC+hC-hB-hB-iA-oG+yf--+-yzzzyzyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyxy+-zwnxlBxnBzkCwiCufCsdCqcBoZBqa9ue3+j0-l0-k0-h0-h0-h5-cAwRBdOBYOBYOBYOBXNBWNCWNCVNCVNCVMCVMCULATJ7UF1RE0RE0RE0QE0QF0PI0NK0NM1NI0KB0I90H90H90H90G91GC4JJCQPIVPJW",
        "ZEpaEqaEsbDucDwdDxfCzgB-gB-gB-hB-kB+tT+-v-z+zzyzyyzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyxyzzzyuzlFwmB+jDxhDufDteDscDqaCqZCtb6zh0-k0-j0-h0-f0-g3-d9yTBhPCaRDbQCaPCZOCYNCWNCWNCWNCVNCVMCUMBUK9UG2RE0QE0QE0QE0QE0QE0PE0PD0OC0K90I80G90G90H90H80GB3JIBQQIXQJX",
        "ZEpZEqaDraDtbDvcDweCyeB+fB-fB-gB-hA-nK++m-+++yzyyyzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyyyyyy+zzmNwj9ziCxgDueDtcDsbDrZDrYCtZ9zf1-j0-i0-g0-f0-f2-e7zUBlREeSFfSEeREcQEbQEaQEZPEYODWOEWODWNCULAUH4SE0QE0QE0QE0QE0PD0PD0QD0PB0M90I80G90H90H90H80GA2IH9OPHWQJX",
        "YDoYDpZDraDsaDubDvcCxeCyfB+gA-gA-f9-jD+wa+-y-zzzzyyyzyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyxx+-+pYvg8yhCxeCudDtbDsZDsYCrXCsYBxc3-g0-h0-g0-e0-f1-f6-WAoSFiTHkTHjTHhSHgSHfSHeRHdRHbQGaQGaPFYNDWJ6UE0QE0QE0QE0QE0PD0PD0PD0PB0MA0J80H81H90H90G80G91HE6MNGVQJX",
        "XDoYDoYCqZCraCtaCvcBxeCyeAzgA-gA-f9-g9-rQ+-t-+++zyzyzyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyxx+-ztixe9wgCyeDucDtbDtaDtYDsXCsXBwb5+f0-g0-f0-e0-f1-f5-XAqRDiUHmTHlTIlTIlTJkTJkTJkTJiTJhTIgSIeQFaM9XE1QE0QE0QE0QD0QD0PD0PC0OB0NA0J80G80H80H80H81H91HC5KMETQJW",
        "XCnXCoYCpZCqaCsaCtcBvdBxeAyf9+g9-f9-f8-mI++m-+++zyzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyyyxxyz+zxsyfDvfBydDvcDtbDtaDsZDsYDsYCva7zd0-f0-f0-d0-f0-f3-b9vSCiTGlUHmTHmTHmTImTJmTJmTJmTKnUKmTKkSIhOEeF3TD0PE0QE0QD0QD0PD0PC0PB0NA0J80H80H80H80G80G81HC4LJCRPIW",
        "XBkXBlYBnZBoaCqaCscCudBvdAxe9zf8+f8-f7-iC+xd--z-zzzzzzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyzzz+zzhKvdAydDwbDtaDtZDsZDsYDsYDtaAyc2-e0-e0-d0-e0+f2-d8+UBlVGkWHoWHnWHoVInUInUImTImTJnTJnTJmSIlOEgG4WD0PE0QD0QD0QD0PD0PC0PC0OA0K80H80H80G80G80G80HB3LJBRQIX",
        "XAhXAjXAkZBmaBpbCrbCtcBudAwe9ye9zf9+e8-e8+sT+-v-z+zzzzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxwwwwwwxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyy--+lTvb9wcCwbCuaDsZDsZDsYDsYCsZBxb4-d0-e0-d0-e0-e2-e7-WApWFkYHoYHoYHoXIoXIpXJpWJoWJoVJoVJoUImREjJ6YD0PD0PD0PD0QD0PD0PC0PC0OB0L80H80H80H80G80G81HA3LIARRJZ",
        "W9eXAgX9iYAkZAlaAobBqcAtdAud9xe9yf9+e8-c7+nL+-q-+++zzzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyx--+qexa8vcCwbCuaCtZCsYDsYDsYCsYBwb6+d0-f0-e0-e0-e0-e5-X9qUCiYHpXHoXHoXHoXIpXIpYJpYJpXKpXJqXJpVHnM8cD0QD0PD0PD0QD0QD0PC0PC0OB0M90H80H80H80G80G80HA2KH9TRKc",
        "V8dW8eX9gY9iZ9jZ9lb9oc9qd9sd9ue9we8yf8+d5-jE+zi--++zzzzzzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyz+-zvoxbAubCxbBuaCuZCtZCsYDsYCrYCta8yc1-f0-e0-d0-f0-e3-Y9qRBfXHoXGoXHoXHoXHpXIpYIpYJpYJqYJqXIpWHnOAfE0RC0PC0PD0PD0PD0PC0PC0OB0M90I80G80H80H80H80H91KF8SPId",
        "WAgWAgW9hX9iY9jZ9la8mb9oc9qd8td8ve8xf7ze4-f7zwZ+-y-zzzzzzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyz+zyxzdGtbAxbCvaBuaCtZCsYCsYCrXCsYAwb2+d0-d0-c0-e0-e3-b8wS9iWEmXGoXGoXGpXHpYHpYIpYIpYIqYHqYIqXHoQBhF1TC0OC0PC0PD0PD0PC0PC0OB0M90J80G80H80H80H80H81IE5QMEb",
        "WCjXCjXCkXBkYBlZAmaAnaApbAqc9sd9ud8vf8yf5-c5+rQ+-v-++zzzzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyy--+jQuZ5vbBwaBvaBuYCsYCrYCrXCrYBub4zd0-d0-d0-d0-e2-e6+W9pUCkXFpXFoYGpYGpYHqYHqYHqYHpXHpYHqYHqUEkM7aE1SC0OD0PD0PC0PC0PC0OB0MA0J80H80H80H80H80G80HD5PMDa",
        "XDkXDlYDlYCmYCmZCnaCoaCqbCrcAsdAtd9ve9xe7+b5zlJz-q-+-+zzzzzzyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyz+zzu+nVwa9ta9vaBuZBsYCrYCrXBrYBta6yc0-d0-d0-d0-e1-e5-Y9sTBjXFoXFoXGpYGpYHqYHqXHpXHpXGqYGqXHqXGoUDkJ5ZC0OC0PD0PD0PC0OB0NB0LA0K90I80H80H80H80H80HB3NLBY",
        "XDlXEmYDmYDnYDnYDoZCpaCqaCrbCscBtcBudBwdAza7+hE+zj---+zzzzzzzyzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyzz+z--+sfxZ9sZAuZBsYCrXCqXBqXBrY8xc1-d0-d0-d0-d0-e4-aAwSAjWFnXFpXFpYGpYGqYGqXGqXGpYGqYGqXGqYGpWEmM7dC0QC0PD0PD0PC0OB0NB0KA0KA0J80H80H80H80H80HA2LJ8V",
        "WDlXDlXEmYDnYDoYEoZDpaDqbDrbDsbDscCucBvcBya8+dA+wb--+-zzzzzzzyzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyyyyz---kTuY7tZBtYBrXCqXCqXBqY9va3zc0-c0-c0-d0-e3-dA+UAmUDmXFpXFpXFqYGqYGqXGqXGqYGqYGqYHqYGqXFoP9gD0RC0OD0PC0PC0PB0NA0LA0KA0K90J80H80H80H80GA2KH7T",
        "WDlXDlXDmYEnYDoYDoZDpaDqaDqbDrbDrbCucCvcBxaA+a8+rSz-v-+++zzzzzzyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyyyyz--+umya8saBuZBqYCpXCqXBqXBsa5yc0-c0-c0-d0-c1+d8-WAqTBkXEpWEpXEpXFqYFqYGqYGqYGqYGqYHqYGqXFpSBjF1TC0OC0OC0PC0PB0NA0LA0KA0KA0J90H80H80H80G91JG6R",
        "WDmXDmXDmYDnYEoZDpZDqYDqZDqZDraDraCtbCubBvaBzY8+mMz-r-+-zzzzzzzyyyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyyzyz+++yvzdDrb8taBpYBpYBoYBoXBqZ7wc0-c0-d0-d0-b1+d7-ZAuSAhWEoWDoWDoWEpXEpXFpXGpXGqYGqZGrYFqXEpUBlI2WC0PC0OC0OC0PB0NA0KA0KA0KA0J90I80H80H80H91IE4P",
        "WDmWDnXDnYDnYDoYCpYCqYCqYDrZDrZCrZCtaCubBvaBzX8+iHyzm-+-+zzzzzzyyyyyyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyyzyyzzz--+iMsc5tb9qZ9mZ9lYAlY9nZ7tb2+d0-c0-c0-b1-d6-aAxS9hVDlWDnWDnXEoXEoXFpXGpYGqYGqYGqYFqYEpVCmK4ZC0PC0OC0OC0OB0OA0L90JA0KA0J90I80H80H81G81HC3O",
        "WDnWDoXDoXDpYDqXCqYCqYCqYCqYCrYCrZBtaBuaBxZ9+Z8+mKz+l++++zzzzzzzzzyyyyyyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyyyyz---oZwd3vg9va9mZ9jY8jY8kZ7pb3zd0-c0-c0-c0-c4-cAzT9jUChXElXDlXEmXEnYFoYGpYGpYGqYFqYFqXDpWCmM5aC0PC0OC0OC0PC0PB0M90J90JA0J90I80H80H80G80GA2M",
        "VDmWDoWDpXDpXCpXCpXCqXCqXCqYCrYCrZBuaAwZ9zX6-jG+zg--y-z++zzyzzzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyyzyz---tkwd6wiB+ZApY9lY8jY7jY7na4wc0+d0-c0-c0-c2+d8-V9oT9cYChYChYDiZEkZFmZFnZGnZFnZFoZFpYEnXCmO6dD0QB0NB0OC0PC0PB0N90J90JA0J90I80H81G81G80G92K",
        "WEnWEnWDoWCpWCpWBpXBpXCpXCqYCrYCrZBuZAxX8za9zuU--u-+-++z+zzzzzzzzzzzzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyyyyyyyyyyyyyyyzyz+-+xrzgDxdBxZCrYBoZBnZAnZ9na6ub1+d0-c0-c0-a1+c7-YAsS8bX9dZAeYAeYBgZChZDjaEkaEkaFlaFmaElYCkR8fE1SB0NB0NB0OC0PB0M90J90J90K90I80H81G81G70F91I",
        "WEnWEnWDnWCoWCoWCpWCpXCpXCqYCrYCrYBuYAxW7+c9zxZ+-z-++++z+zzzzzzzzzzzzzzzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyzzzzzz+-+yt+dEubCvZEsZDqZDqZCpZBpZ9ub3zc0-c0-c0-a1+a5+aAxT8fW9cYAdYAeZAeZAeZBfZBfaBgaCibDjbCjaCiU9dH2SB0NB0MA0NB0NB0M90K90J90J80I81G80G81G71F81H",
        "WEnWEnWDnWDnWDoWDoWDpXDpXDqYDrYCrYBtYAwW7+Z8yuYz-y-++++z+zzzzzzzzzzzzzzzzzzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyzzzzzz--+sjxZAvbEvaEtaEsaEsZEraDrZBta5xb0-c0-c0-a0+Z3zb9zU9kWBgaElZDkZCjaChaBhZBgaBgaBgaBgbBgaAfW8cJ1TB0NA0MA0MB0MA0M90K80J80J80I81G81F81F71F71G",
        "WEnWEnWEnWEnWEoWEoWEpXDqXDqXDrXDrYCsYBvW9zY8ysW+-x-+++++++++zzzzzzzzzzzzzzzzzzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyzzzzzzzzz+++-+-gOtaAwaEuaEtaEtaEsaEsZDraDuZ7xb0-c0-c0-a0-Z1ya7xU8nR8cXCiZEmaEnaEnaEmaEmaDlbDlaDkaCkZBhW8eL2WC0OA0MA0MA0NA0M90K80I80J80I81G81F71F71F71G",
        "VEmVEnWEnWEoWEpWEpXDqXDqXDrXDrXDqYDrYCuXAzW7ypUz-w-+-+++++++zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyzzzzzzzzzzzzzzzzz+---mbuZAvbEwZEuaEtaEtZEsZDrYCqV9oT4qY0zc0-b0-a0-Y1ya5yW9rI3UF1QK4WO7bSAgXDmaEoZEnaFoaFpaFoaEmYCjO6bD0PA0MA0MA0NA0M90K80I80I80I80G70F71F71F71F",
        "UDmVEnVEnWEoWDpWDqWDqWCqXDqXDqXDqYDrYDuXByV8+mRz-v-+-+++++++++++++zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyyyzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz-++---oduZAtbCxaDvZDuZDuZDsYDrVBpP5hJ1ZJ0cT0tb0-a0-a0-Y0zZ4yX8sI4V90KA0MC0OF2TK5ZQ9fYDnaFqaGqaGqaFqYDnQ9fD1QA0L90LA0LA0L90K80I80I80H80F70F71F71F71F",
        "UDmVEmVDnWDoWDoWCpWCpWCpWCqXDqXDqXDrYDtYCwV9+gJ++r----+++++++++++++++zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz+++---+y+kUuZ8ubBxaCwZCvaDuZCsYCrU9mM3cG0VF0UH0WO0lY0-a0-a0-Y0zX2xZ8wO6fC0OD1OD2QC0PD0QJ4XWDmaGsZHsZHsaGsZFqTBjF2T90L90K90K90L90K80J80I80H80G71F71F71F71F",
        "VEmVEnVEnVDnVDnVCnVCoVCoVCpWCpXDqXDrXDsYCuXByY9+qX+-+-+-+-z+++z++++++++++++++++++zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz+zzzzzzz+zzzzz+------+y+qfwdHsY7waBxaCwZCvZCvZCtYCsS8lJ1ZH0VH0VF0TF0TK0dU0vZ0-Y0-W0yV0uT4qL3dF2SD1PB0NA0NC1QI4XWEoaHuZHtZHtZHtZGrVDmH3W90K90LB0NE0RE0RC0PB0O90L80H71F71F71G71F",
        "VEnVEoVEnVDnVDnVDnVCoVCoVCpWDpXDqXDrXDsXCsYCuY9ycByuc-------+z++++++++++++++++++++++++++++++++++++++++++++z++z+zzzzzz+z+--+------yszrcxhJuZ8tZ7yaBxZBwZBvZCuZCuZDtYCsP6iG0UH0VH0VH0VH0WI0ZN0iR0rT0uS0rO0kJ0cD0RB0MA0MA0MA0NC1PH4WWDpaHvZGuZGuZGuZGrWDoK5Z90MA0NG0TR3fU5kS3hM1bB0Q80G71E71F71G71F",
        "VEnWEnVEnVEnVEnVEnVDoWDoWDpWEqXEqXDrXDrXDrXCsYCuYAvbBxqZy-y+---------+++++++++++++z++z++z+zz+zz+zz+zz++++--+----------+-yszqdwkNve4ve4zeCzaDwZBvZBvZBuZCuZCuZDtYDtZDtR7jF0TF0TF0TF0UG0VG0VG0WJ0bL0fK0dG0XD0QA0MA0LA0LA0MA0MB0PG2WUCoaGwZFuZFuZFvZFtXEqN7f90NA0NG0VT3ja6sa5sT3kF0T70H71E71F71F71F",
        "VEnVDnVEnVEnVEnVEoVEoWEpWEqXEqXEqXEqXDqXDqXCrYCsYCtYBvY8vdIuobwxpz-y-------------------------------------+v-yp+vizoRvtTxnKwZ5vd5zf1-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"
    };

    /** Die Breite des Fotos in Bildpunkten. */
    public int breite() {
        return DATEN[0].length() / 3;
    }

    /** Die Hoehe des Fotos in Bildpunkten. */
    public int hoehe() {
        return DATEN.length;
    }

    /**
     * Liefert einen Farbkanal als Gitter von Werten zwischen 0 und 255.
     * @param pVersatz 0 fuer rot, 1 fuer gruen, 2 fuer blau
     */
    private int[][] kanal(int pVersatz) {
        int[][] werte = new int[hoehe()][breite()];
        for (int zeile = 0; zeile < hoehe(); zeile++) {
            String daten = DATEN[zeile];
            for (int spalte = 0; spalte < breite(); spalte++) {
                werte[zeile][spalte] = ZEICHEN.indexOf(daten.charAt(spalte * 3 + pVersatz)) * 4;
            }
        }
        return werte;
    }

    /** Der rote Kanal des Fotos, 0 bis 255. */
    public int[][] rot() {
        return kanal(0);
    }

    /** Der gruene Kanal des Fotos, 0 bis 255. */
    public int[][] gruen() {
        return kanal(1);
    }

    /** Der blaue Kanal des Fotos, 0 bis 255. */
    public int[][] blau() {
        return kanal(2);
    }

    /**
     * Das Foto als Graustufen, 0 ist schwarz und 255 ist weiss.
     * Gruen zaehlt am meisten, blau am wenigsten - so sieht das Auge.
     */
    public int[][] graustufen() {
        int[][] r = rot();
        int[][] g = gruen();
        int[][] b = blau();
        int[][] grau = new int[hoehe()][breite()];
        for (int zeile = 0; zeile < hoehe(); zeile++) {
            for (int spalte = 0; spalte < breite(); spalte++) {
                grau[zeile][spalte] =
                    (r[zeile][spalte] * 30 + g[zeile][spalte] * 59 + b[zeile][spalte] * 11) / 100;
            }
        }
        return grau;
    }
}
