import * as React from 'react'

export const SvgLogo = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <g clipPath="url(#clip0_31_7)">
      <g filter="url(#filter0_d_31_7)">
        <path
          fill="#001417"
          d="M50 25c0 13.807-11.193 25-25 25S0 38.807 0 25 11.193 0 25 0s25 11.193 25 25"
        ></path>
        <path
          stroke="#FCEE0A"
          d="M49.5 25c0 13.531-10.969 24.5-24.5 24.5S.5 38.531.5 25 11.469.5 25 .5 49.5 11.469 49.5 25Z"
        ></path>
      </g>
      <path
        stroke="#FCEE0A"
        strokeLinejoin="bevel"
        strokeWidth="4.32"
        d="M17.86 12h7.26m0 0v13.483m0-13.483h5.186l4.149 3.63v6.742l-4.149 3.111H25.12m-7.26 13.483h7.26V25.483m0 0H13"
      ></path>
      <path
        stroke="#001417"
        strokeLinejoin="bevel"
        strokeWidth="1.08"
        d="M13 25.5h12M17.86 12H25m0 13.5h4.74l4.86-3.24v-6.48L30.28 12H25m0 13.5V12m0 13.5V39h-7.14"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_31_7">
        <path fill="#fff" d="M0 0h50v50H0z"></path>
      </clipPath>
      <filter
        id="filter0_d_31_7"
        width="54"
        height="54"
        x="-2"
        y="0"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="2"></feOffset>
        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_31_7"></feBlend>
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_31_7" result="shape"></feBlend>
      </filter>
    </defs>
  </svg>
)
