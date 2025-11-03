"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIssueUrl;
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
function useIssueUrl(backendVersion) {
    const [isLoading, setIsLoading] = react_1.default.useState(true);
    const router = (0, router_1.useRouter)();
    react_1.default.useEffect(() => {
        setIsLoading(false);
    }, []);
    return react_1.default.useMemo(() => {
        if (isLoading) {
            return '';
        }
        const searchParams = new URLSearchParams({
            template: 'bug_report.yml',
            labels: 'triage',
            link: window.location.href,
            'backend-version': backendVersion || '',
            'frontend-version': [app_1.default.UI.footer.frontendVersion, app_1.default.UI.footer.frontendCommit].filter(Boolean).join('+'),
            'additional-information': `**User Agent:** ${window.navigator.userAgent}`,
        });
        return `https://github.com/blockscout/blockscout/issues/new/?${searchParams.toString()}`;
        // we need to update link whenever page url changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backendVersion, isLoading, router.asPath]);
}
