import styled from 'styled-components'

export type ButtonColors = {
  bg: string
  text: string
}

export type ButtonProps = {
  colors: ButtonColors
}

const Button = styled.button.attrs((props: ButtonProps) => ({
  className: `
  py-1
  px-2
  bg-${props.colors.bg}
  text-${props.colors.text}
  `,
}))``

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ButtonGenerator = (colorProps: ButtonColors) => (props: any) => (
  <Button {...props} colors={colorProps} />
)

export const PrimaryButton = ButtonGenerator({
  bg: 'primary',
  text: 'white',
})

export const SecondaryButton = ButtonGenerator({
  bg: 'secondary',
  text: 'white',
})
