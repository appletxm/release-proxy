import html from './template.html'
import intro1 from 'assets/images/intro-1.png'
import intro2 from 'assets/images/intro-2.png'
import intro3 from 'assets/images/intro-3.png'
import intro4 from 'assets/images/intro-4.png'
import intro5 from 'assets/images/intro-5.png'
import intro6 from 'assets/images/intro-6.png'
import intro7 from 'assets/images/intro-7.png'

export default {
  template: html,
  data() {
    return {
      introImgs: [
        {imgUrl: intro1},
        {imgUrl: intro2},
        {imgUrl: intro3},
        {imgUrl: intro4},
        {imgUrl: intro5},
        {imgUrl: intro6},
        {imgUrl: intro7}
      ]
    }
  }
}
