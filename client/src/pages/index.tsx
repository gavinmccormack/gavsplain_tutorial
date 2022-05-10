import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Main } from '../components/Main'

const Index = () => (
  <>
  <Hero />
    <Main>
      <h2>Hello World</h2> 
    </Main>
  </>
)

export default Index
