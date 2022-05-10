import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title, subTitle }: { title: string, subTitle: string }) => (
  <div>
    <Heading fontSize="6vw">{title}</Heading>
    <Heading fontSize="6vw">{subTitle}</Heading>
  </div>
)

Hero.defaultProps = {
  title: 'What Fresh Hell',
  subTitle: 'Of Tech Stack Is This',
}
