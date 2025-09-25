import copy from 'copy-to-clipboard';
import { showSuccessToast, showFailToast } from 'vant';
import { t } from '@/locale'

interface RippleHTMLElement extends HTMLElement {
    _copyValue: string
}

export default {
    mounted(el: RippleHTMLElement, binding: any) {
        el.addEventListener('click', () => {
            let valueToCopy = el._copyValue || binding.value
            const result = copy(valueToCopy);
            if (result) showSuccessToast(t('复制成功'))
            else showFailToast(t('复制失败'))
        });
    },
    updated(el: RippleHTMLElement, binding: any) {
        el._copyValue = binding.value;
    }
};