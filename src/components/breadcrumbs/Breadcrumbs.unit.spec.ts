import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs.vue'
import { render, screen, user } from '~/test-util'
import {IBreadcrumb} from '~/types/breadcrumbs'
import { useRouter, useRoute } from 'vue-router'

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}))

const parts: IBreadcrumb[] = [
  {title: 'Page1'},
  {title: 'Page2'},
  {title: 'Page3', href: 'home'},
]

const onClick = jest.fn()

const renderBreadcrumbs = () => {
  return render(Breadcrumbs, {
    props: {
      part: parts,
    },
    global: {
      stubs: ['router-link', 'router-view'],
    },
  })
}

test('rendering breadcrumbs and chevrons', async () => {
  renderBreadcrumbs()
  const chevrons = await screen.findAllByTestId('breadcrumbs-chevron')
  const breadcrumbs = await screen.findAllByTestId('breadcrumbs-item')
  const breadcrumbItem_1 = screen.getByText('Page1')
  const breadcrumbItem_2 = screen.getByText('Page2')
  const breadcrumbItem_3 = screen.getByText('Page3')

  expect(breadcrumbItem_1).toHaveClass('disabled')
  expect(breadcrumbItem_2).toHaveClass('disabled')
  expect(breadcrumbItem_3).not.toHaveClass('disabled')
  expect(chevrons.length).toBe(parts.length - 1)
  expect(breadcrumbs.length).toBe(parts.length)
})

test('click on the breadcrumb with href', async () => {
  (useRoute as jest.Mock).mockImplementationOnce(() => ({
    name: 'home',
  }))
  const push = onClick;
  (useRouter as jest.Mock).mockImplementationOnce(() => ({
    push,
  }))
  renderBreadcrumbs()
  const breadcrumbItem = screen.getByText('Page3') as HTMLElement

  expect(breadcrumbItem.parentElement).toBeInTheDocument()
  expect(breadcrumbItem.parentElement).toHaveAttribute('href', 'home')

  await user.click(breadcrumbItem)

  expect(push).toHaveBeenCalledTimes(1)
  expect(push).toHaveBeenCalledWith({name: 'home'})
})

